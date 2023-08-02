import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller, register } from 'react-hook-form';
import "./form.css"
import { FaArrowLeft } from 'react-icons/fa'


const colors = ['red', 'green', 'blue', 'white', 'black'];

const MyForm = ({ data, setData }) => {
  // console.log('ddd', data)
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
 // console.log('errors',errors.checkboxGroup)

  const options = [
    { id: 'byEmail', label: 'by email' },
    { id: 'byPhoneCall', label: 'by phone call' },
    { id: 'viaSms', label: 'via SMS' },
  ];
  const onSubmit = (dataAdd) => {
    //console.log('data',dataAdd)
    // Add the new data to the array
    const trueKeysArray = Object.keys(dataAdd?.checkboxGroup);
   // console.log('vvv',trueKeysArray)
    const uniqueId = uuidv4()
    dataAdd['contactPreference'] = trueKeysArray;
    dataAdd['id'] = uniqueId
    const newData = [...data, dataAdd];
    // localStorage.setItem('formData', JSON.stringify(newData));
    setData(newData)
    reset();
    navigate('/')
  };

  const handleGoBack = () => {
    navigate('/')
  };
  const validateAtLeastOneSelected = (value) => {
    return Object.values(value).some((selected) => selected) || 'Please select at least one checkbox.';
  };

  return (
    <div className="form-container">
      <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => <input {...field} />}
          />
          {errors.name && <span style={{ color: 'red', margin: "10px" }}>{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Surname:</label>
          <Controller
            name="surname"
            control={control}
            rules={{ required: 'Surname is required' }}
            render={({ field }) => <input {...field} />}
          />
          {errors.surname && <span style={{ color: 'red', margin: "10px" }}>{errors.surname.message}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required', pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => <input {...field} />}
          />
          {errors.email && <span style={{ color: 'red', margin: "10px" }}>{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <Controller
            name="age"
            control={control}
            rules={{
              required: 'Age is required',
              min: { value: 0, message: 'Age must be a positive number' },
              max: { value: 119, message: 'Age must be less than 120' }
            }}
            render={({ field }) => <input type="number" {...field} />}
          />
          {errors.age && <span style={{ color: 'red', margin: "10px" }}>{errors.age.message}</span>}
        </div>

        <div className="form-group">
          <label>Favorite color:</label>
          <Controller
            name="favoriteColor"
            control={control}
            rules={{ required: 'Favorite color is required' }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.favoriteColor && <span style={{ color: 'red', marginTop: "10px" }}>{errors.favoriteColor.message}</span>}
        </div>

        <div className="form-group">
          <label>Contact preference:</label>
          {options.map((option) => (
            <div key={option.id}>
              <Controller
                name="checkboxGroup"
                control={control}
                defaultValue={false}
                rules={{ validate: validateAtLeastOneSelected }}
                render={({ field }) => (
                  <label>
                    <input
                      type="checkbox"
                      {...field}
                      value={option.label}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setValue('checkboxGroup', { ...field.value, [value]: checked });
                      }}
                    />
                    {option.label}
                  </label>
                )}
              />

            </div>
          ))}
          {errors.checkboxGroup && <span style={{ color: 'red', marginTop: "10px" }}>{errors.checkboxGroup.message}</span>}
        </div>
        <div className="submit-div">
          <button className="go-back-button" onClick={handleGoBack}>  <FaArrowLeft className="icon" /> Go Back</button>
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default MyForm