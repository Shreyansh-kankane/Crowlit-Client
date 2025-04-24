import { jwtDecode } from "jwt-decode";

function getDeviceType(): 'android' | 'ios' | 'desktop' {
    const ua = navigator.userAgent.toLowerCase();

    if (/android/.test(ua)) return 'android';
    if (/iphone|ipad|ipod/.test(ua)) return 'ios';
    return 'desktop';
}

function decodeToken(token: string) {
    const decodedData = jwtDecode(token);
    return decodedData;
  }
  


export { getDeviceType, decodeToken };