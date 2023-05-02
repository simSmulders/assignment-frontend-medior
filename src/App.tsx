import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Main} from "components/Main";
import {Vegetables} from "./components/Vegetables";
import {Fruits} from "./components/Fruits";
import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/admin/vegetables" element={<Vegetables type="vegetables" tags={[]} name="" description=""/>}/>
                    <Route path="/admin/fruits" element={<Fruits type="fruit" tags={[]} name="" description=""/>}/>
                </Routes>
            </Router>
        </Provider>

    );
}

export default App;
