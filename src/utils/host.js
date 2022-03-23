import axios from "axios";

const BASE_URL = 'https://brivity-react-exercise.herokuapp.com/';

export default axios.create({
    baseURL: BASE_URL
});