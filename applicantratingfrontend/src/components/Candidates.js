import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Candidate";
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@mui/material";
import CandidateForm from "./CandidateForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Candidates = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    
    useEffect(() => {
        props.fetchAllCandidates()

    }, [])
    const tableRef = useRef(null);
    const EditRef = useRef(null);


    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteCandidate(id, { appearance: 'info' })
    }
    const scrollToTable = () => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToForm = () => {
        EditRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
     <div>
            <Grid container  paddingRight={30} paddingLeft={40} paddingTop={10}  ref={EditRef} >
                <Grid >
                    <CandidateForm {...({ currentId, setCurrentId })} scrollToTable={scrollToTable}  />
                </Grid>
            </Grid>
            <Grid container paddingTop={10} paddingLeft={10}>
                <Grid item xs={6} >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Degree</TableCell>
                                    <TableCell>Years of Experience</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Github Link</TableCell>
                                    <TableCell>Repository Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody ref={tableRef}>
                                {
                                    props.CandidateList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.degree}</TableCell>
                                            <TableCell>{record.yearsOfExperience}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.gitHubLink}</TableCell>
                                            <TableCell>{record.repoCount}</TableCell>
                                        
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                     <Button onClick={() => { setCurrentId(record.id); scrollToForm();  }}><EditIcon/></Button>
                                                    <Button  onClick={() => onDelete(record.id)}> <DeleteIcon/></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
 </div>
    );
}

const mapStateToProps = state => ({
    CandidateList: state.Candidate.list

})

const mapActionToProps = {
    fetchAllCandidates: actions.fetchAll,
    deleteCandidate: actions.Delete,

}

export default connect(mapStateToProps, mapActionToProps)((Candidates));