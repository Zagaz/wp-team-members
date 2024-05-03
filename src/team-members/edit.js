// TEAM MEMBERS BLOCK: EDIT ============================================
import { __ } from "@wordpress/i18n";
// Block Editor
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
// Components
import { PanelBody, RangeControl } from "@wordpress/components";
// Styles
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { columns } = attributes;
	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	return (
		<div
			{...useBlockProps({
				className: `has-${columns}-columns`,
			})}
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__("Columns", "team-member")}
						value={columns}
						onChange={onChangeColumns}
						min={1}
						max={6}
					/>
				</PanelBody>
			</InspectorControls>

			<InnerBlocks
				allowedBlocks={["team-member/team-member"]}
				orientation="horizontal"
				template={[
					["team-member/team-member"],
					["team-member/team-member"],
					["team-member/team-member"],
				]}
			/>
		</div>
	);
}
