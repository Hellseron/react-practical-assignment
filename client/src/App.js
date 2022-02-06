import {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import {setUsername} from "./actions/user";
import {BrowserRouter, Route, Routes} from "react-router-dom";

class App extends Component {


    componentDidMount() {
        localStorage.getItem("USERNAME") && this.props.setUsername(localStorage.getItem("USERNAME"))
        // TEST API, it might be removed
        // fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
        //   console.log('API CONNECTION IS OK');
        // }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
    }


    render() {
    return (
        <div className="App">
            {
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>} exact/>
                        <Route path="/main" element={<UserPage/>} exact/>
                    </Routes>
                </BrowserRouter>


            }


        </div>
    );
}


}
const mapStateToProps = (state) => {
    return ({
        user: state.user.username
    })
}
export default connect(mapStateToProps,{setUsername})(App);
