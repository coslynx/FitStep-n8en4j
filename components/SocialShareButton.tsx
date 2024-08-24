import React from 'react';
import { ShareButton } from 'react-share';

interface SocialShareButtonProps {
  url: string;
  title: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ url, title }) => {
  return (
    <div className="flex gap-2">
      <ShareButton
        url={url}
        title={title}
        className="text-gray-500 hover:text-gray-700"
        children={<i className="fa fa-facebook-square"></i>}
      />
      <ShareButton
        url={url}
        title={title}
        className="text-gray-500 hover:text-gray-700"
        children={<i className="fa fa-twitter-square"></i>}
      />
      <ShareButton
        url={url}
        title={title}
        className="text-gray-500 hover:text-gray-700"
        children={<i className="fa fa-linkedin-square"></i>}
      />
    </div>
  );
};

export default SocialShareButton;