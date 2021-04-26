import React from "react";

type Props = {
    audioFileName: string | undefined
}

export const AudioPlayer = ({ audioFileName }: Props) => {
	return (
		<>
			{
				audioFileName &&
                <div className="mt-2">
                	<audio 
                		controls 
                		src={audioFileName}
                	>
                		Your browser does not support audio playback 
                	</audio>
                </div>
			}
		</>
	);
};
