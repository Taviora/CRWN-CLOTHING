import React from 'react';
import './App.css';

import { Route, Switch ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
 
import HomePage  from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';
import SignInAndSignUpPage  from './pages/sign-in-and-singn-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth,  createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import {setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionForPreview } from './redux/shop/shop.selector';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser, collectionArray } = this.props;

   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>  {

     if(userAuth){
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
       this.props.setCurrentUser ({
            id: snapShot.id,
            ...snapShot.data()
          })
       });

       
     }else{
       setCurrentUser( userAuth );
       addCollectionAndDocuments('collections',collectionArray.map(({title,items}) => ({ title,items})));
     }
    

      
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
       <Header></Header>
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/shop' component={ShopPage}></Route>
            <Route exact path='/checkout' component={CheckoutPage}></Route>
            <Route exact path='/signin' render={() => 
              this.props.currentUser ? 
                  (<Redirect to='/'></Redirect>) :
                  (<SignInAndSignUpPage></SignInAndSignUpPage>)}>
            </Route>
          </Switch>
      </div>
    );

  }
  
};

const mapStateToProps = createStructuredSelector ( {
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
