import {Component, OnInit} from '@angular/core';
import {TagService} from '../../services/tag/tag.service';
import {Tag} from '../../models/tag.model';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

    tags: Tag[] = [];

    shownTags: Tag[] = [];

    batchSize: number = 24;

    pageCount: number = 0;

    tagWidth: number = 320;

    constructor(
        private tagService: TagService,
    ) {
    }

    ngOnInit(): void {
        this.tagService.getAllTags().subscribe(tags => {
            this.tags = tags;
            this.loadTags();
        });
    }

    loadTags() {
        this.shownTags = this.shownTags.concat(this.tags.slice(this.batchSize * this.pageCount, this.batchSize * this.pageCount + this.batchSize));
        this.pageCount++;
    }
}
