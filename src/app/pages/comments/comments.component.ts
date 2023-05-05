import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/model/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  commentForm!: FormGroup;
  private commentsCollection: AngularFirestoreCollection<Comment>;
  comments: Observable<Comment[]>;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.commentsCollection = firestore.collection<Comment>('comments', ref => ref.orderBy('date', 'desc'));
    this.comments = this.commentsCollection.valueChanges();
   }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)],],
      comment: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    const comment: Comment = {
      title: this.commentForm.get('title')!.value ,
      comment: this.commentForm.get('comment')!.value,
      date: new Date(),
    };
    this.firestore.collection('comments').add(comment).then(() => {
      console.log('Comment added successfully');
      this.commentForm.reset();
    }).catch((error) => {
      console.error('Error adding comment: ', error);
    });
  }

}
