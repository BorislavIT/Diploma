export const combineMp3PathWithFile = (file: string) => {
  return `${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/mp3/${file}`;
};

export const combineThumbnailPathWithFile = (file: string) => {
  return `${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/thumbnails/${file}`;
};
