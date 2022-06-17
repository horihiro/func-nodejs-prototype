import { Binding, HttpInputBinding, HttpOutputBinding, HttpResponse, InvocationContext, QueueOutputBinding } from "@azure/functions-newB";

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding();
const queueBinding = new QueueOutputBinding({
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
});

export const httpMultipleOutputsBindings: Binding[] = [reqBinding, resBinding, queueBinding];

export async function httpMultipleOutputs(context: InvocationContext): Promise<HttpResponse> {
    const req = reqBinding.get(context);

    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    resBinding.set(context, {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    });
    queueBinding.set(context, { name });
};