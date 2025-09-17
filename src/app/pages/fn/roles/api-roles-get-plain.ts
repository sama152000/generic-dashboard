import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StrictHttpResponse } from '../../strict-http-response';
import { LookupDto } from '../../models/lookup-dto';

export interface ApiRolesGet$Plain$Params {}

export function apiRolesGet$Plain(http: HttpClient, rootUrl: string, params?: ApiRolesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LookupDto>>> {
  return http.get<Array<LookupDto>>(`${rootUrl}/api/Roles`, { observe: 'response', context }).pipe(
    map((response: HttpResponse<Array<LookupDto>>) => ({
      body: response.body || [],
      status: response.status,
      headers: response.headers,
      statusText: response.statusText
    }))
  );
}
