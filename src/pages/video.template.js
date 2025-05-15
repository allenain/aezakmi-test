import WhiteContainer from "../components/Container.js";
import Button from "../components/Button.js";
import videoIcon from "!!raw-loader!../assets/icons/video.svg";

const header = `
<h1 class="large-title large-title-bold video-title">VideoPlayer</h1>
`;
const content = `
  <section class="title1-bold video-container">
    <div class="video-empty" id="video-empty">
      <span class="video-icon">${videoIcon}</span>
      <div class="video-empty__text">
        <h2 class="title1 title1-bold">No video files</h2>
        <span class="body">Click on the Add button to upload your first video file</span>
      </div>
      <div id="video-trigger">${Button("Upload video file")}</div>
      
      <input type="file" id="video-input" accept="video/*"  style="display: none;" />
    </div>
 
</section>
`;

export default WhiteContainer(header, content);
