import React from 'react';

const VideoBackground = ({ videoSrc, children }: { videoSrc: string, children: React.ReactNode }) => {
    return (
        <div
            style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
        >
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Content */}
            <div style={{ position: 'relative', zIndex: '1' }}>
                {children}
            </div>
        </div>
    );
};

export default VideoBackground;
