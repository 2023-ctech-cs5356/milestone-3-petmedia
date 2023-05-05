
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PetContext } from '../../context/PetContext';
import { AuthContext } from '../../context/AuthContext';

import InputLogin from '../InputLogin';
import styles from '../Pets/AddNewPet.module.css';
import inputsData from './inputsData';

const AddNewPet = () => {
  const ctx = useContext(PetContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    bread: '',
    imageUrl: '',
    description: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    await addPet();
  };

  const addPet = async () => {
    try {
      await ctx.addNewPet({
        name: values.name,
        bread: values.bread,
        imageUrl: values.imageUrl,
        description: values.description,
        ownerId: currentUser.uid,
        likedBy: [],
      });
      navigate('/pets');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Add Pet</h1>
      <div className={styles.almub}>
        <div className={styles['wrapper-form']}>
          <div className={styles['space']}></div>
          <form className="grid grid--2-cols" onSubmit={handleAddPet}>
            {inputsData.map((input) => (
              <InputLogin
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className={styles['btn-form-container']}>
              <button className={styles['submit-button']}>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPet;