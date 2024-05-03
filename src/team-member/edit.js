// TEAM MEMBER
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
} from "@wordpress/block-editor";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
} from "@wordpress/components";
import "./editor.scss";
import { useEffect, useState } from "@wordpress/element";

export function Edit({
	attributes,
	setAttributes,
	noticeOperations, // Notification operations
	noticeUI, // Notification UI - For error messages (Wrong file type, etc.)
}) {
	// ATTRIBUTES
	const { name, bio, url, id, alt } = attributes;
	const [blobURL, setBlobURL] = useState();

	// FUNCTIONS

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
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
		noticeOperations.removeAllNotices(); // It deletes all previous notices
		noticeOperations.createErrorNotice(message); // The message itself.
	};

	const removeImage = () => {
		setAttributes({
			id: undefined,
			url: undefined,
			alt: "",
		});
	};

	useEffect(() => {
		//This will kill the Spinner if image was not uploaded.
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: "",
			});
		}
	}, []);

	useEffect(() => {
		//It saves memory by revoking the previous blob URL.
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
		}
	}, [url]);

	// RETURN
	return (
		<>
			<InspectorControls>
				<PanelBody>
					{
					url && !isBlobURL(url) &&
					<TextareaControl
						label={__("Alt Text", "team-member")}
						value={alt}
						onChange={onChangeAlt}
						help={__(
							"Alt text helps screen readers describe the image to people who can't see it.",
							"team-member",
						)}
						placeholder={__("Alt text here", "team-member")}
					/>
					}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						// Replace Image
						name={__("Replace Image", "team-member")}
						mediaId={id}
						mediaURL={url}
						accept="image/*"
						allowedTypes={["image"]}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
					/>
					<ToolbarButton onClick={removeImage}>
						{__("Replace Image", "team-member")}
					</ToolbarButton>
				</BlockControls>
			)}

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
