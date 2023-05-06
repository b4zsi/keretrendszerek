import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { Comment } from '../model/Comment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsCollection: AngularFirestoreCollection<Comment>;
  comments: Observable<Comment[]>;

  constructor(private firestore: AngularFirestore, private snackbarService:SnackBarService, private userService :UserService) {
    this.commentsCollection = firestore.collection<Comment>('comments', ref => ref.orderBy('date', 'desc'));
    this.comments = this.commentsCollection.valueChanges();
  }

  getAll() :Observable<Comment[]>{
      return this.comments;
  }

  addComment(comment: Comment) {
    this.firestore.collection('comments').add(comment).then(() => {
      this.snackbarService.openWithMessage("Komment sikeresen hozzáadva.");
    }).catch((error) => {
      this.snackbarService.openWithMessage("Valami hiba történt.")
    });

  }
  deleteComment(docId:any) {
      this.firestore.collection('comment').doc(docId).delete()
  }
}
