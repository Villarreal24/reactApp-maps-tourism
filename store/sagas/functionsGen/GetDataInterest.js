import { call, put } from 'redux-saga/effects';
import { db } from '../../Services/Firebase';
import { actionGetDataInterest } from '../../ACTIONS';

const dataInterest = async ({ doc }) => {
  await db
    .doc(`interest/${doc}`)
    .get()
    .then(document => this.setState({ data: document.data() }));
  console.log(this.state.data);
};

export default function* SagaGetDataInterest(value) {
  try {
    const arr = yield call(db.doc("interest/activities").get());
    console.log("Funcion Data");
    const algo = arr.data();
    console.log(algo);
    if (arr) {
      // yield put(actionGetDataInterest(arr));
    } else {
      console.log("No hay datos de interes.");
    }
  } catch (error) {
    console.log(error);
  }
}
