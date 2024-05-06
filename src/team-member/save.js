
// TEAM MEMBER
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
	const { name, bio, url, alt } = attributes;

	return (
		<>
			<div {...useBlockProps.save(
				{ className: "team-member-card-frontend" }
			)}>
				{
					url && 
					<img src={url} alt ={alt} className="team-member-image-fe" />
				}
				<div className="member-data">
				<RichText.Content tagName="h4" value={name} />
				<RichText.Content tagName="p" value={bio} />
				</div>
			</div>
		</>
	);
}
