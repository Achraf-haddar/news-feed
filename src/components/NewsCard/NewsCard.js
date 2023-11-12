import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./NewsCard.module.css";
import { formatTimestamp } from "../../utils/timestampProcessing";

export default function NewsCard(props) {
  const { singleNews } = props;
  const notFoundImage =
    "https://via.placeholder.com/150/CCCCCC/000000?text=No+Image";

  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.cardMedia}
        image={singleNews.urlToImage ? singleNews.urlToImage : notFoundImage}
        title="green iguana"
      />
      <CardContent
        className={styles.cardContent}
        sx={{ flexGrow: 1, overflow: "auto" }}
      >
        <Typography
          gutterBottom
          variant="h6"
          className={styles.title}
          component="div"
        >
          {singleNews.title}
        </Typography>
        <Typography
          className={styles.info}
          sx={{ mb: 1.5, mt: 0.5 }}
          color="text.secondary"
        >
          {singleNews.author && (
            <div>
              Author: {singleNews.author}
              <br />
            </div>
          )}
          Created at: {formatTimestamp(singleNews.publishedAt)}
          <br />
          {singleNews.category && (
            <div>
              Category: {singleNews.category}
              <br />
            </div>
          )}
          Source: {singleNews.source}
        </Typography>
        <Typography variant="body2" className={styles.content}>
          Content:
          <Typography color="text.secondary">
            {singleNews.description}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={singleNews.url} target="_blank">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
