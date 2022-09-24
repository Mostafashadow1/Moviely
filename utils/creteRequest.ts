import { baseUrl } from "./constant";
export class createRequest {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  makeRequest() {
    return `${baseUrl}/${this.url}/`;
  }
}
