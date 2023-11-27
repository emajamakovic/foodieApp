import React from "react";
import Tab  from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ExploreRecipe from "../components/ExploreRecipe";
import ExploreReview from "../components/ExploreReview";
import '../styles/Explore.css';
import { useNavigate } from 'react-router-dom';


export default function Explore() {
    const [tabvalue, setTabValue]=React.useState('0');
    const navigate = useNavigate();
    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);
   

    React.useEffect(() => {
        // Redirect to login page if user is null
        if (!user) {
          navigate('/login');
        }
      }, [user, navigate]);


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    return (
        <div>
             <TabContext value={tabvalue}>

            <div className="tabs">
                <TabList  onChange={handleChange} 
                    sx={{
                        "& button": {color:'black', width:'300px'},
                        "& button.Mui-selected": {backgroundColor: '#cfe6dc', color: 'black'}
                        }}
                    TabIndicatorProps={{hidden:true}}
 >

                    <Tab  label="Recipes" value="0" />
                    <Tab  label="Reviews" value="1" />
                </TabList>
            </div>

            <div className="tabpanel">
                <TabPanel value="0"><ExploreRecipe/></TabPanel>
                <TabPanel value="1"><ExploreReview/></TabPanel>
               
            </div> 
            </TabContext>

        </div>
    )
}