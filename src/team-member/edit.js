// TEAM MEMBER
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { isBlobURL } from "@wordpress/blob";
import { Spinner, withNotices } from "@wordpress/components";
import "./editor.scss";

export function Edit({
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
}) {
	// ATTRIBUTES
	const { name, bio, url, alt } = attributes;

	// FUNCTIONS

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({
				id: undefined,
				url: undefined,
				alt: undefined,
			});
			return;
		}
		setAttributes({
			id: image.id,
			url: image.url,
			alt: image.alt,
		});
	};

	const onSelectURL = (newURL) => {
		setAttributes({
			url: newURL,
			id: undefined,
			alt: "",
		});
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	// RETURN
	return (
		<>
			<div
				{...useBlockProps({
					className: "team-member-backend-card-img",
				})}
			>
				{/* IMAGE */}
				{url && (
					<div
						className={`team-member-team-member-img-${
							isBlobURL(url) ? " is-loading" : ""
						}`}
					>
						<img src={url} alt={alt} b className="team-member-image" />
						{isBlobURL(url) && <Spinner />}{" "}
					</div>
				)}
				<MediaPlaceholder
					icon="admin-users"
					labels={{ title: "Team Member Image" }}
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					onError={onUploadError}
					allowedTypes={["image"]}
					notices={noticeUI}
					accept="image/*"
					disableMediaButtons={url}
				/>

				<RichText
					placeholder={__("Member Name", "team-member")}
					tagName="h4"
					value={name}
					onChange={onChangeName}
					allowedFormats={[]}
					className="team-member-name"
				/>
				<RichText
					placeholder={__("Member Bio", "team-member")}
					tagName="p"
					value={bio}
					onChange={onChangeBio}
					allowedFormats={[]}
					className="team-member-bio"
				/>
			</div>
		</>
	);
}

export default withNotices(Edit);
