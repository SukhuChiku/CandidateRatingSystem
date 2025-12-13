import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText
} from "@mui/material";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Candidate";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFieldValues = {
  fullName: "",
  email: "",
  yearsOfExperience: "",
  age: "",
  degree: "",
  gitHubLink: "",
  mobile: "",
  address: ""
};

const CandidateForm = (props) => {
  // --- VALIDATION ---
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    const required = [
      "fullName",
      "mobile",
      "yearsOfExperience",
      "email",
      "age",
      "address",
      "degree",
      "gitHubLink"
    ];

    required.forEach((field) => {
      if (field in fieldValues)
        temp[field] = String(fieldValues[field]).trim() === "" ?  "This field is required.":"";
    });

    if ("email" in fieldValues)
      if (!/^\S+@\S+\.\S+$/.test(fieldValues.email))
        temp.email = "Email is not valid.";

    if ("gitHubLink" in fieldValues)
      if (!/^https:\/\/github\.com\/[A-Za-z0-9._-]+$/.test(fieldValues.gitHubLink))
        temp.gitHubLink = "Must start with 'https://github.com/'";

    if ("age" in fieldValues)
      if (!/^\d+$/.test(fieldValues.age))
        temp.age = "Age must be an integer.";
    
    if ("yearsOfExperience" in fieldValues)
      if (!/^\d+$/.test(fieldValues.yearsOfExperience))
        temp.yearsOfExperience = "YoE must be an integer.";

    if ("mobile" in fieldValues)
      if (!/^\d{10}$/.test(fieldValues.mobile))
        temp.mobile = "Mobile must be 10 digit.";


    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
            props.fetchAllCandidates();
        if (props.scrollToTable) props.scrollToTable(); // scroll to table
        toast('Saved Successfully!', { type: 'success' })
      };
      if (props.currentId === 0)
      {
        props.createCandidate(values, onSuccess);
      }
      else
      {
        props.updateCandidate(props.currentId, values, onSuccess);
      }

    }

  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.CandidateList.find((x) => x.id === props.currentId)
      });
      setErrors({});
    }
  }, [props.currentId]);

  // -----------------------------------------------------------------------
  // FIELD ARRAY — all textfields come from this list
  // -----------------------------------------------------------------------
  const textFields = [
    { name: "fullName", label: "Full Name" },
    { name: "email", label: "Email" },
    { name: "gitHubLink", label: "Github Link" },
    { name: "yearsOfExperience", label: "Years Of Experience" },
    { name: "mobile", label: "Mobile" },
    { name: "age", label: "Age" },
    { name: "address", label: "Address" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
      <form autoComplete="off" onSubmit={handleSubmit}>

<Grid container spacing={{ xs: 1, sm: 4, md: 6 }}>
<Grid item  xs={12} sm={6} md={6}  > 
 <TextField 
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
               />
              
</Grid>
<Grid item  xs={12} sm={6} md={6}  >
                    <TextField 
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
</Grid>
<Grid item  xs={12} sm={6} md={6}  > 

                    <TextField 
                        name="gitHubLink"
                        variant="outlined"
                        label="Github Link"
                        value={values.gitHubLink}
                        onChange={handleInputChange}
                        {...(errors.gitHubLink && { error: true, helperText: errors.gitHubLink })}
                    />
                     </Grid>
<Grid item  xs={12} sm={6} md={6}  > 
                    <TextField sx={{ minWidth: 200, maxWidth: 400 }}
                        name="yearsOfExperience"
                        variant="outlined"
                        label="Years Of Experience"
                        value={values.yearsOfExperience}
                        onChange={handleInputChange}
                        {...(errors.yearsOfExperience && { error: true, helperText: errors.yearsOfExperience })}
                    />

</Grid>
<Grid item  xs={12} sm={6} md={6}  > 
                    <FormControl sx={{ minWidth: 203, maxWidth: 400 }} error={Boolean(errors.degree)} >
               
                      <InputLabel id="degree-label">Degree</InputLabel>

                            <Select
                                labelId="degree-label"
                                name="degree"
                                label="Degree"
                                value={values.degree}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="">Select Degree</MenuItem>
                                <MenuItem value="Bachelors">Bachelors</MenuItem>
                                <MenuItem value="Masters">Masters</MenuItem>
                                <MenuItem value="NA">None of the above</MenuItem>
                            </Select>

                        {errors.degree && (
                            <FormHelperText>{errors.degree}</FormHelperText>
                        )}
     
                    </FormControl>
                     </Grid>
                    <Grid item  xs={12} sm={6} md={6}  > 
                                <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                        </Grid>
<Grid item  xs={12} sm={6} md={6}  >   
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        {...(errors.age && { error: true, helperText: errors.age })}
                  
                    />
                     </Grid>
<Grid item  xs={12} sm={6} md={6}  > 
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        {...(errors.address && { error: true, helperText: errors.address })}
                  
                    />
    </Grid>


          {/* --- Buttons --- */}
     <Grid item  xs={12} sm={6} md={6} container spacing={{ xs: 1, sm: 4, md: 19 }}  >      
            <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
              Submit
            </Button>

            <Button variant="contained" onClick={resetForm}>
              Reset
            </Button>
    </Grid> 
         </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  CandidateList: state.Candidate.list
});

const mapActionToProps = {
  createCandidate: actions.create,
  updateCandidate: actions.update,
  fetchAllCandidates: actions.fetchAll
};

export default connect(mapStateToProps, mapActionToProps)(CandidateForm);
