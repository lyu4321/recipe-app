import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from '@angular/fire/firestore';

import {
  ShoppingList,
  shoppingListConverter,
} from '../domain/shopping-list.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private firestore: Firestore) {}

  async getShoppingList(userId: string): Promise<ShoppingList> {
    const docs = (
      await getDocs(
        collection(
          this.firestore,
          `user-data/${userId}/shoppingList`
        ).withConverter(shoppingListConverter)
      )
    ).docs;
    if (docs && docs.length) {
      console.log(docs[0].data());
      return docs[0].data();
    } else {
      const docRef = doc(
        collection(this.firestore, `user-data/${userId}/shoppingList`)
      );
      return new ShoppingList(docRef.id);
    }
  }

  async storeUserShoppingList(
    shoppingList: ShoppingList,
    userId: string
  ): Promise<void> {
    await setDoc(
      doc(
        this.firestore,
        `user-data/${userId}/shoppingList`,
        shoppingList.id
      ).withConverter(shoppingListConverter),
      shoppingList
    );
    // }
  }
}
