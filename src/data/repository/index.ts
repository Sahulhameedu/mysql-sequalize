import BaseRepository from "./BaseRepository";
import { AddPostRepository } from "./AddPostRepository";
import { AddUserRepository } from "./AddUserRepository";

const CombinedRepository = AddPostRepository(AddUserRepository(BaseRepository));

const repository = new CombinedRepository();
export default repository;
