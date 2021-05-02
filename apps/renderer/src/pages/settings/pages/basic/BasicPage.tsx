import * as React from 'react'
import { Card, Form, Radio } from 'antd'

type BasicPageProps = {}

export const BasicPage: React.FC<BasicPageProps> = (props) => {
    return (
        <Card>
            <Form.Item label={'主题'}>
                <Radio.Group
                    options={[
                        {
                            label: '明亮',
                            value: 1,
                        },
                        {
                            label: '黑暗',
                            value: 2,
                        },
                    ]}
                />
            </Form.Item>
        </Card>
    )
}
