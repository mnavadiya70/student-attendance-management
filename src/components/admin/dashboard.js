import React from 'react'
import { Flex, Text, Box } from 'theme-ui'

import Carnival from '../../static/images/carnival.jpg'
import ClassParty from '../../static/images/ClassParty.jpg'
import EndOfYear from '../../static/images/EndOfYear-Printables.jpg'
import SchoolActivities from '../../static/images/FieldDay-SchoolActivities.jpg'
import PTConferences from '../../static/images/ParentTeacherConferences.jpg'

function DashBoard() {

    const events = [
        { title: "School Carnival Fundraisers", description: "Announcing a new mobile experience for SignUp Organizers.", image: `${Carnival}` },
        { title: "Class Party Planning Center", description: "Class party planning is easy with these great resources for snack and craft ideas.", image: `${ClassParty}` },
        { title: "Parent Teacher Conferences", description: "Time-saving tips, reminders and checklists for successful parent teacher conferences", image: `${PTConferences}` },
        { title: "The Best Field Day Games & Activities", description: "Delight students with this stress-free planning guide for your Sports Day.", image: `${SchoolActivities}` },
        { title: "5 Printables for the End of the Year", description: "These fun and interactive end-of-year printables will keep your class engaged.", image: `${EndOfYear}` }
    ]

    return (
        <>
            <Text as="h2" sx={{ color: '#E5BF7D', textAlign: 'center', borderBottom: '2px solid white' }}>School Activities</Text>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {
                    events.map((obj, index) => {
                        return (
                            <Flex
                                key={index}
                                sx={{
                                    margin: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxSizing: 'border-box',
                                    width: 'auto',
                                    maxWidth: '250px'
                                }}>
                                <Box
                                    sx={{
                                        flex: 1,
                                        paddingBottom: '10px'
                                    }}>
                                    <img src={obj.image} alt={obj.title} height="100%" width="100%" />
                                </Box>
                                <Box
                                    sx={{
                                        flex: 2,
                                        textAlign: 'center'
                                    }}>
                                    <Text
                                        as="h5"
                                        sx={{
                                            color: '#E5BF7D',
                                            paddingBottom: '20px'
                                        }}>
                                        {obj.title}
                                    </Text>
                                    <Text
                                        sx={{
                                            color: 'white'
                                        }}>
                                        {obj.description}
                                    </Text>
                                </Box>
                            </Flex>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default DashBoard