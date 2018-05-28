import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Link} from "../link";
import {LinkService} from "../link.service"

@Component({
  selector: 'app-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.css']
})
export class LinkDetailComponent implements OnInit {
  @Input() link: Link;

  constructor(
    private linkService: LinkService,
    // private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    // this.location.back();
  }

  save(): void {
    this.linkService.updateLink(this.link)
      .subscribe(() => this.goBack())
  }

}
