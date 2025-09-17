import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected http: HttpClient;
  protected rootUrl: string;

  constructor(config: ApiConfiguration, http: HttpClient) {
    this.http = http;
    this.rootUrl = config.rootUrl;
  }
}

export class ApiConfiguration {
  rootUrl: string = 'http://advisor.runasp.net/api/';
}
