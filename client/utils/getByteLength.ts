const getByteLength = (s: string): number => {
  const stringByteLength = s.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;
  return stringByteLength;
};

export default getByteLength;
