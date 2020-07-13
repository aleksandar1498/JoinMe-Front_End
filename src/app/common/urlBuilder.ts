import { environment } from '../../environments/environment';

export function urlBuilder(customPath: string): string {
    return `${environment.resturl}${customPath}`;
}