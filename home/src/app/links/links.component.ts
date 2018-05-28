import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service'
import {Category} from "../category";
import {Link} from "../link";
import {CategorySimple} from "../category-simple";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  categories: Category[];
  catSimple: CategorySimple;
  addTo: Category;
  selectedLink: Link;
  hoverLink: Link;

  constructor(
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this.getLinks();
  }

  addCat(name: string): void {
    if(!name) { return; }

    this.linkService.addCategory({name} as Category)
      .subscribe(cat => this.categories.push(cat))
  }

  addLinkForm(category) {
    this.linkService.getCategory(category.id)
      .subscribe(cat => { this.catSimple = cat });
    this.addTo = category;
  }

  addLink(text: string, url: string, category: Category): void {
    text = text.trim();
    url = url.trim();
    if(!url) { return; }
    if(!text) { text = url; }

    this.linkService.addLink({text, url} as Link)
      .subscribe(link => {
        category.links.push(link);
        this.catSimple.links.push(link.id);
        this.updateCategory(this.catSimple);
      });

    this.addTo = null;
  }

  removeLink(link, cat, $event) {
    $event.preventDefault();

    cat.links.pop(link);
    this.linkService.getCategory(cat.id)
      .subscribe(cat => {
        cat.links.filter(l => l !== link.id);
        this.linkService.updateCategory(cat);
      });

    this.linkService.removeLink(link).subscribe();
  }

  updateCategory(category): void {
    this.linkService.updateCategory(category)
      .subscribe()
  }

  onSelect(link, $event) {
    $event.preventDefault();
    this.selectedLink = link;
  }

  onMouseEnter(link) {
    this.hoverLink = link;
  }

  onMouseLeave() {
    this.hoverLink = null;
  }

  getLinks(): void {
    this.linkService.getCategories().subscribe(categories => this.categories = categories);
  }

}
