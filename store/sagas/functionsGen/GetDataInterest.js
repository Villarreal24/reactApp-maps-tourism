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
    const arr = yield call(dataInterest, value);
    console.log(arr);
    if (arr) {
      console.log("Entro en el if");
      yield put(actionGetDataInterest(arr));
    } else {
      console.log("pendejada");
    }
  } catch (error) {
    console.log(error);
  }
}
