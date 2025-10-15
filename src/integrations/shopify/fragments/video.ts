const videoFragment = /* GraphQL */ `
  fragment video on Video {
    id
    alt
    sources {
      url
      mimeType
      format
      height
      width
    }
  }
`;

export default videoFragment;
