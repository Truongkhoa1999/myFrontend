import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface MultiActionAreaCardProps {
  title: string;
  description: string;
  image: string;
  className: string;
  price: string
}

export default function MultiActionAreaCard({
  title,
  description,
  image,
  className,
  price
}: MultiActionAreaCardProps) {
// universe const
const [limitedDes, setLimitedDes] = React.useState<string>("")
const [limitedTit, setLimitedTit] = React.useState<string>("")


  // Limit number of words in description
  React.useEffect (() => {
    if (description) {
      const words: string[] = description.split(" ")
      const setLimit = 4
      if (words.length >= setLimit) {
        const LIMITED_ALLOWANCE = words.slice(0,setLimit).join(" ")
setLimitedDes(`${LIMITED_ALLOWANCE}....`)
      } else {
        setLimitedDes(description)
      }
    }
  },[description])

  // Limit number of words in title
  React.useEffect (() =>{
    if(title){
      const words:string[] = title.split(" ")
      const setLimit = 2
      if(words.length >= setLimit){
        const LIMITED_ALLOWANCE = words.slice(0, setLimit).join(" ")
        setLimitedTit(`${LIMITED_ALLOWANCE}`)
      } else {
        setLimitedTit(title)
      } 
    }
  },[title])

  return (
    <Card className="multi-action-card" sx={{ maxWidth: 190, minHeight: 250, }}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="100"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {limitedTit}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {limitedDes}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
  );
}
