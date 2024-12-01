import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let html = '<html><body>';
    html += '<input type="text">';
    html += '</body></html>';
    return html;
  }
}
