// The Cloud Functions for Firebase SDK to create Cloud Functions
// and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// Calculate the calification of a product every time a new opinion is added
exports.calcCalification = functions.firestore
    .document("/products/{documentId}/opinions/{opinionId}")
    .onCreate((snap, context) => {
      const opinion = snap.data();
      const productId = context.params.documentId;
      const productRef = admin.firestore()
          .collection("products").doc(productId);
      return admin.firestore().runTransaction(async (transaction) => {
        const product = await transaction.get(productRef);
        const productData = product.data();
        const calification = productData.calification;
        console.log(productId, productData);
        console.log(opinion);
        const numberOfOpinions = productData.numberOfOpinions;
        const newCalification =
        (calification * numberOfOpinions + opinion.calification) /
        (numberOfOpinions + 1);
        transaction.update(productRef, {
          calification: newCalification,
          numberOfOpinions: numberOfOpinions + 1,
        });
      });
    });
