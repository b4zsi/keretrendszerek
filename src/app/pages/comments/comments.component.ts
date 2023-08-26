import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/model/Comment';
import { CommentService } from 'src/app/shared/services/comment.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  commentForm!: FormGroup;
  comments: Comment[] = [];
  elso?:Comment;
  constructor(private fb: FormBuilder,
    private CommentService :CommentService,
    private userService :UserService,
    private firestore:AngularFirestore) {}

   ngOnInit(): void {
    this.commentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)],],
      comment: ['', [Validators.required, Validators.minLength(20)]],
    });
      this.comments = this.CommentService.getAll();
  }

  onSubmit() {
    const autoId = this.firestore.collection('images').doc().ref.id;
    const comment: Comment = {
      id:autoId,
      title: this.commentForm.get('title')!.value ,
      comment: this.commentForm.get('comment')!.value,
      date: new Date().getTime(),
    };
    this.CommentService.addComment(comment, autoId);
    this.commentForm.reset();
  }

  deleteComment(comment:Comment) {
    this.CommentService.deleteComment(comment.id);
  }

  isAdmin():boolean {
    return this.userService.isAdminUser(this.userService.loggedUser?.email as string);
  }

}
