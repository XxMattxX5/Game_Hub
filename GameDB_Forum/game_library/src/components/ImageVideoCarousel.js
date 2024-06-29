import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

export default function ImageVideoCarousel(props) {
  const [currentIndex, setCurrentIndex] = useState(0); // Holds current position on carousel
  const videos = props.videos ? props.videos : []; // Holds videos for carousel
  const images = props.images ? props.images : []; // Holds screenshots for carousel
  const total_items =
    images.length != 0 || videos.length != 0
      ? images.length + videos.length
      : 0; // Total number of images and videos

  // Moves the caroursel if the user hits the next or previous arrow
  const moveCarousel = (newIndex) => {
    if (newIndex > total_items - 1) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = total_items - 1;
    }
    setCurrentIndex(newIndex);
  };

  // Gets video or screenshot
  const getItem = (index) => {
    if (index < videos.length) {
      return { type: "video", src: videos[index].url };
    } else if (index < images.length + videos.length) {
      return {
        type: "image",
        src: images[index - videos.length].url.replace("t_thumb", "t_original"),
      };
    }
  };

  // Renders the carousel items onto the page
  const renderItems = () => {
    const itemsToRender = [];
    for (let i = 0; i < props.visible; i++) {
      const index = (currentIndex + i) % total_items;
      const item = getItem(index);

      itemsToRender.push(
        <Grid
          key={i}
          container
          className={
            i === Math.floor(props.visible / 2) ? "item active" : "item"
          }
        >
          {item.type == "image" ? (
            <img className="carousel_image_video" src={item.src} />
          ) : (
            <iframe
              key={item.src}
              className="carousel_image_video"
              src={item.src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </Grid>
      );
    }
    return itemsToRender;
  };

  return (
    <div id="image_video_carousel">
      {total_items > 3 ? (
        <IoIosArrowDropleft
          onClick={() => moveCarousel(currentIndex - 1)}
          size={150}
          className="slideshow_arrows"
          style={{ position: "absolute" }}
        />
      ) : null}
      {total_items != 0 ? (
        renderItems()
      ) : (
        <Typography variant="h3" id="no_image_video">
          {" "}
          No Images or Videos
        </Typography>
      )}
      {total_items > 3 ? (
        <IoIosArrowDropright
          onClick={() => moveCarousel(currentIndex + 1)}
          size={150}
          className="slideshow_arrows"
          style={{ right: 0 }}
        />
      ) : null}
    </div>
  );
}
