import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';

const create = (accountName) => new Promise(resolve => setTimeout(() => resolve(), 1000));

export default {
    create
}