import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, CardContent, Container, Grid, Typography,alpha } from "@mui/material";

const URL = "http://localhost:8000";

export default function ButtonCompo() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`${URL}/buttonComponents`);
      setItems(result.data);
    };
    fetchItems();
  }, []);

  const handleButtonClick = (btnCompo) => {
    navigator.clipboard.writeText(btnCompo);
    alert("code copied");
  };
  
  return (
    <div style={{ paddingTop: "100px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ height:"85vh", overflowY: 'scroll'}}>
          {items.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={3} lg={2.35}>
              <Card sx={{ margin: "auto", 
              flex: '0 0 calc(32vw - (2.7em * 2))', 
              height: "160px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              position: 'relative',
              backgroundColor: alpha('#ffffff', 0.7)
             }}>
                <CardContent>
                  <Typography gutterBottom dangerouslySetInnerHTML={{ __html: item.btnCompo }} />
                </CardContent>
                <Container sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '0px'}}>
                  <Button sx={{ fontSize: 9}} onClick={() => handleButtonClick(item.btnCompo)}>Copy to clipboard</Button>
                </Container>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
