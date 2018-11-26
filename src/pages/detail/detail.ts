import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  image: string;
  title: string;
  text: string;

  constructor(
    private http: HttpClient,
  ) {
    this.http.get("http://beacon-server-distribuited.herokuapp.com/api/promotion.json?beacon_id=123456")
      .toPromise().then(
        (data) => {
          this.image = data['imagem'];
          this.title = data['titulo'];
          this.text = data['mensagem'];
        }
      );
  }

}
