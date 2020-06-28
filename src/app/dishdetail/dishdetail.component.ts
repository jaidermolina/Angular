import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {switchMap} from 'rxjs/operators';
import {Comment} from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') commentFormDirective;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string; 
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;

  formErrors = {
    comment: '',
    author: ''
  };

  validationMessages = {
    comment: {
      required:      'The comment is required.',
    },
    author: {
      required:      'Author Name is required.',
      minlength:     'Author Name must be at least 2 characters long.',
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }, 
    errmess => this.errMess = <any>errmess);

    this.createForm();
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  private createForm() {
    this.commentForm = this.fb.group({
      rating: '5',
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
      }
    );
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.commentForm.value.date = Date.now();
    this.comment = this.commentForm.value;
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      rating: '5',
      comment: '',
      author: '',
      date: ''
    });
    this.commentFormDirective.resetForm({rating: '5'});
  }
}
