import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public director: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }
  ) {}

  ngOnInit(): void {
    this.director.Birth = this.director.Birth?.trim();
    this.director.Death = this.director.Death?.trim();
  }
}
