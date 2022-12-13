import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { sleep } from 'k6';

const targetVU = 300;
const sleepDuration = 1;
const url = "https://dev.moheyum.ga/api";

export const options = {
  stages: [
    // { duration: '0.5m', target: targetVU  },
    // { duration: '1m', target: targetVU },
    // { duration: '0.5m', target: 0 }
    { duration: '2.5m', target: targetVU  },
    { duration: '5m', target: targetVU },
    { duration: '2.5m', target: 0 }
  ],
  threshholds: {
    'http_req_duration': ['p(90)<300'],
    'http_req_failed': ['rate<0.01'],
  }
};

const data = new SharedArray('user', function () {
  return JSON.parse(open('./user.json'));
})

export function setup() {
  const body = data[0];
  const res = http.post(url+"/auth/signin", JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json'},
  }).cookies;

  return res;
}

export default function(data) {
  const jar = http.cookieJar();
  jar.set(url, "r_t", data.r_t[0].Value);
  jar.set(url, "a_t", data.a_t[0].Value);

  const postList = getNewsfeed();
  const userId = lookPost(postList);
  lookProfile('rkskekfk');
  lookFollowing(userId);
}

function getNewsfeed(){
  const res = http.get(url+"/post/newsfeed").json().data.post;
  sleep(sleepDuration);
  return res;
}

function lookPost(postList){
  if (postList.length === 0)
    return 'rkskekfk';
  const randId = Math.floor(Math.random()*postList.length);
  const res = http.get(url+`/post/${postList[randId]._id}`).json().data;
  sleep(sleepDuration);
  return res.post.author;
}

function lookProfile(userId){
  http.get(url+`/user/${userId}`);
  sleep(sleepDuration);
}

function lookFollowing(userId){
  http.get(url+`/follow/list/following/${userId}`);
  sleep(sleepDuration);
}