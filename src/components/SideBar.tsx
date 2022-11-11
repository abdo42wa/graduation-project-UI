import { ChevronRight, ExpandMore } from '@mui/icons-material'
import { TreeItem, TreeView } from '@mui/lab'
import { Paper } from '@mui/material'

const SideBar = () => {
    return (
        <Paper elevation={3} >
            <TreeView
                aria-label="multi-select"
                defaultCollapseIcon={<ExpandMore sx={{}} />}
                defaultExpandIcon={<ChevronRight />}
                multiSelect
                sx={{ height: 216, flexGrow: 1, maxWidth: 400 }}
            >
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="8" label="index.js" />
                    <TreeItem nodeId="9" label="tree-view.js" />
                </TreeItem>
            </TreeView>
        </Paper>
    )
}

export default SideBar