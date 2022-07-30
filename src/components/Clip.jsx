import React from "react";
import HoverVideoPlayer from "react-hover-video-player";

const Clip = ({ vdata }) => {
	return (
		<div>
			{/* hover */}

			<div className="clip" style={{ margin: "4rem 2rem" }}>
				<p style={{ fontSize: "1.25rem" }}>{vdata.user.name}</p>

				{
					<HoverVideoPlayer
						className="videoset"
						controls
						style={{ maxWidth: "30vw", maxHeight: "100%", cursor: "pointer" }}
						videoSrc={vdata.video_files[0].link}
						pausedOverlay={
							<img
								src={vdata.image}
								alt=""
								style={{
									// Make the image expand to cover the video's dimensions
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						}
						loadingOverlay={
							<div className="loading-overlay">
								<div className="loading-spinner" />
							</div>
						}
					/>
				}
			</div>
		</div>
	);
};

export default Clip;
