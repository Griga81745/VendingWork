import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../crud/auth.crud";
import * as routerHelpers from "../../router/RouterHelpers";
import { setStorage } from "../../crud/local.storage";


export const actionTypes = {
  Login: "[Login] Action",
  UpdateUid: "[UpdateUid] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  CurrentUserLoaded: "[CurrentLoad User] Auth API",
  ActionBoardsG: "[GAllery boards] Action"
};

const initialAuthState = {
  user: undefined,
  FireBaseUser: undefined,
  currentUser: undefined,
  authTokenG: undefined,
  boardsG: undefined
};

export const reducer = persistReducer(
  { storage, key: "okta", whitelist: ["user", "users", "currentUser", "authTokenG", "boardsG"] },
  (state = initialAuthState, action) => {
    switch (action.type) {

      case actionTypes.ActionBoardsG: {
        const { boardsG } = action.payload;
        return { ...state, boardsG: boardsG };
      }

      case actionTypes.Login: {
        const { FireBaseUser, authTokenG } = action.payload;
        routerHelpers.forgotLastLocation();
        return { authTokenG };
      }

      case actionTypes.UpdateUid: {
        const { authTokenG } = action.payload;
        return { ...state, authTokenG };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;
        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        routerHelpers.forgotLastLocationExit();
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.CurrentUserLoaded: {
        const { currentUser } = action.payload;
        return { ...state, currentUser };
      }

      default:
        return state;
    }
  }
);

export const actions = {

  login: (FireBaseUser, authTokenG, history) => ({ type: actionTypes.Login, payload: { FireBaseUser, authTokenG, history } }),
  updateUid: authTokenG => ({ type: actionTypes.UpdateUid, payload: { authTokenG } }),
  register: () => ({ type: actionTypes.Register, payload: {} }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (FireBaseUser, history) => ({ type: actionTypes.UserRequested, payload: { FireBaseUser, history } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  fulfillCurrentUser: currentUser => ({ type: actionTypes.CurrentUserLoaded, payload: { currentUser } }),

  // boardsGallery: boardsG => ({ type: actionTypes.ActionBoardsG, payload: { boardsG } }),
  updateBoards: updateB => ({ type: actionTypes.ActionUpdateBoards, payload: { updateB } })

};

export function* saga() {

  yield takeLatest(actionTypes.Login, function* loginSaga(action) {

    console.log('actionTypes.Login -- saga')
    var { FireBaseUser, history } = action.payload;
    yield put(actions.requestUser(FireBaseUser, history));
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested(action) {

    var { data: user } = yield getUserByToken();

    var { FireBaseUser, history } = action.payload;
    console.log('FireBaseUser -- 222')
    console.log(FireBaseUser)

    // console.log('currentUsercurrentUsercurrent-- history')
    // console.log(history)


    if (user.status == "fail" && user.error == "no_userId") {
      console.log('currentUsercurrentUsercurrentUsercurr0000111222')
      //// не зарегистрирован полностью
      user = "no_user"
    } else {

      if (!!FireBaseUser.displayName) {
        let nameFam = FireBaseUser.displayName.split(" ")
        user.firstname = nameFam[0]
        user.lastname = nameFam[1]
      } else {
        user.firstname = "No Name"
      }


      user.email = FireBaseUser.email


      console.log('currentUsercurrentUsercurrentUsercurr00001113333')
      console.log(user)

      let all_user = {
        email: user.email,
        id: user.id.toString()
      };
      if (!!user.subusers && Object.keys(user.subusers).length) {
        user.subusers[all_user.id] = all_user;
        setStorage("users", user.subusers);
      }


    }


    yield put(actions.fulfillCurrentUser(user));
    yield put(actions.fulfillUser(user));

    if (user == "no_user") {
      history.push("/auth/registration");
      // yield put(push('/auth/registration'));
      //yield browserHistory.push("/auth/registration");
    }

  });
}
