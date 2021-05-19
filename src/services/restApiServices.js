import firebase from '../firebase_config'

export const googleSignIn = googleProvider =>
    firebase.auth().signInWithPopup(googleProvider).then(response => response.user)
        .catch(error => console.log(error))

export const googleLogOut = () =>
    firebase.auth().signOut().then(() => { })
        .catch(error => console.log(error))

export const firestoreGetLimitDocs = (params) =>
    firebase.firestore().collection(params.collection).limit(params.number).get().then(data => {
        let dataIterated = data.docs.map(doc => {
            let data = doc.data()
            data.id = doc.id
            return data
        })
        return dataIterated
    }).catch(error => console.log(error))

export const firestoreGetItemByDocumentId = (params) =>
    firebase.firestore().collection(params.colName).where('__name__', '==', params.id).get().then(data => {
        let dataIterated = data.docs.map(doc => {
            let data = doc.data()
            data.id = doc.id
            return data
        })
        return dataIterated
    }).catch(error => console.log(error))

export const firestoreGetItemsByCollectionName = (collectionName) =>
    firebase.firestore().collection(collectionName).get().then(data => {
        let dataIterated = data.docs.map(doc => {
            let data = doc.data()
            data.id = doc.id
            return data
        })
        return dataIterated
    }).catch(error => console.log(error))

export const firestoreGetItemsWithCompoundQuery = (params) =>
    firebase.firestore().collection(params.collectionName)
        .where(params.field, params.operator, params.condition)
        .where(params.secondField, params.secondOperator, params.secondCondition)
        // .where(params.thirdField, params.thirdOperator, params.thirdCondition)
        .get()
        .then(data => {
            let dataIterated = data.docs.map(doc => {
                let data = doc.data()
                data.id = doc.id
                return data
            })
            return dataIterated
        }).catch(error => console.log(error))

export const firestoreGetItemsWithSingleCompoundQuery = (params) =>
    firebase.firestore().collection(params.collectionName)
        .where(params.field, params.operator, params.condition).get().then(data => {
            let dataIterated = data.docs.map(doc => {
                let data = doc.data()
                data.id = doc.id
                return data
            })
            return dataIterated
        }).catch(error => console.log(error))

export const fireStorageUploadImage = (file, pushArrayFunction, callBack) => {
    let uploadTask = firebase.storage().ref().child(file.name).put(file)
    pushArrayFunction(uploadTask)
    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                console.log(`Progress: ${progress}%`)
            }
        },
        error => console.log(error.code),
        async () => {
            const downloadURL = await firebase.storage().ref().child(file.name).put(file).snapshot.ref.getDownloadURL();
            callBack(downloadURL);
        }

    )
};

export const firestoreSaveDoc = (params, callBack) =>
    firebase.firestore().collection(params.collection).doc(params.doc).set(params.data)
        .then((data) => {
            callBack()
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

export const firestoreDeleteDocument = (params) =>
    firebase.firestore().collection(params.collection).doc(params.document).delete()